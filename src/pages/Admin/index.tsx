import './style.css'

import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import { Logo } from '../../components/Logo'
import { Input } from '../../components/Input'
import { MdAddLink } from 'react-icons/md'

import {db} from '../../services/firebase'
import {toast} from 'react-toastify'

import {
addDoc, 
collection, 
onSnapshot, 
query, 
orderBy, 
doc, 
deleteDoc } 
from 'firebase/firestore'

import { Link } from '../../types/Link';
import Links from '../../components/Links'

export default function Admin() {
    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [backgroundLink, setBackgroundLink] = useState("#000")
    const [colorLink, setColorLink] = useState("#fff")

    const [links, setLinks] = useState<Link[]>([]);

    async function handleDeleteLink(id: string) {
      const docRef = doc(db, "links", id);
      await deleteDoc(docRef)
      toast.success('Link deletado com sucesso')
    }

    useEffect(() => {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));
        
        onSnapshot(queryRef, (snapshot) => {
            let lista: Link[] = []

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })
            setLinks(lista)
        })
    }, [])

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if(nameInput === '' || urlInput === '') {
            toast.warn('Preencha todos os campos!')
            return;
        }

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: backgroundLink,
            color: colorLink,
            created: new Date(),
        })
        .then(() => {
            setNameInput('')
            setUrlInput('')
            toast.success('Link foi cadastro com sucesso!')
        })
        .catch(error => {
            console.log("ERRO AO REGISTRAR " + error)
            toast.error('Ops erro ao salvar o link')
        })
    }

    useEffect(() => {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("creted", "asc"));
    }, [])

    return (
        <div className='admin-container'>
            <Header />
            <Logo />

            <form className='form' onSubmit={handleRegister}>
                <label className='label'>Nome do link</label>
                <Input
                    placeholder='Nome do seu link...'
                    value={nameInput}
                    handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameInput(e.target.value)}
                />

                <label className='label'>URL do link</label>
                <Input
                    type='url'
                    placeholder='Digite a url...'
                    value={urlInput}
                    handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrlInput(e.target.value)}
                />

                <section className='container-colors'>
                    <div>
                        <label className='label right'>Fundo do link</label>
                        <input
                            type="color"
                            value={backgroundLink}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBackgroundLink(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='label right'>Cor do link</label>
                        <input
                            type="color"
                            value={colorLink}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColorLink(e.target.value)}
                        />
                    </div>
                </section>

                {nameInput && (
                    <div className='preview'>
                    <label className='label'>Veja como está ficando 👇</label>
                    <article className="list" style={{marginBottom: 8, marginTop: 8, backgroundColor: backgroundLink}}>
                        <p style={{ color: colorLink }}>{nameInput}</p>
                    </article>
                </div>
                )}
                

                <button type='submit' className="btn-register">
                    Cadastrar <MdAddLink size={24} color="#fff" />
                </button>
            </form>

            <h2 className='title'>Meus links</h2>

            {links.map((item, index) => (
                <Links key={index} bg={item.bg} color={item.color} name={item.name} handleDeleteLink={() => handleDeleteLink(item.id)}/>
            ))}
        </div>
    )
}