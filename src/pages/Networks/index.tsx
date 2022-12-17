import './style.css'

import { useState, useEffect } from 'react';
import Header from '../../components/Header'
import { Input } from '../../components/Input'
import { MdAddLink } from 'react-icons/md'
import {toast} from 'react-toastify'
import { db } from '../../services/firebase'
import { setDoc, doc, getDoc } from 'firebase/firestore'; 

export default function Networks() {
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [youtube, setYoutube] = useState("");

    useEffect(() => {
        function loadLinks() {
            const docRef = doc(db, "social", "link")
            getDoc(docRef)
            .then((snapshot: any) => {
                if(snapshot.data() != undefined) {
                    setFacebook(snapshot.data().facebook)
                    setInstagram(snapshot.data().instagram)
                    setYoutube(snapshot.data().youtube)
                }
            })
            .catch((error) => {
                console.log('ERROR: ' + error)
                toast.warn('Erro ao cadastrar!')
            })
        }

        loadLinks()
    }, [])

    async function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        await setDoc(doc(db, "social", "link"), {
            facebook,
            instagram,
            youtube
        })

        toast.success('Link cadastrado com sucesso!')
    }

    
    return (
        <div className='admin-container'>
            <Header />

            <h1 className="title-social">Suas redes sociais</h1>

            <form className="form" onSubmit={handleSave}>
                <label className='label'>Link do facebook</label>
                <Input 
                    placeholder='Digite a URL do Facebook...'
                    value={facebook}
                    handleInputChange={(e) => setFacebook(e.target.value)}
                />

                <label className='label'>Link do instagram</label>
                <Input 
                    placeholder='Digite a URL do instagram'
                    value={instagram}
                    handleInputChange={(e) => setInstagram(e.target.value)}
                />

                <label className='label'>Link do youtube</label>
                <Input 
                    placeholder='Digite a URL do youtube'
                    value={youtube}
                    handleInputChange={(e) => setYoutube(e.target.value)}
                />

                <button type='submit' className='btn-register'>
                    Salvar links
                    <MdAddLink size={24} color="#fff" />
                </button>
            </form>
        
        </div>
    )
}