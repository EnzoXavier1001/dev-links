import './style.css'
import { useState, useEffect } from 'react'

import { Social } from '../../components/Social'
import { FaFacebook, FaInstagram, FaYoutube} from 'react-icons/fa'

import {
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc
} from 'firebase/firestore'

import { db } from '../../services/firebase'

type Links = {
    id: string;
    name: string;
    bg: string;
    color: string;
    url: string;
}

type SocialLinks = {
    facebook?: string;
    youtube?: string;
    instagram?: string;
}

export default function Home() {
    const [links, setLinks] = useState<Links[]>([])
    const [socialLinks, setSocialLinks] = useState<SocialLinks>({})

    useEffect(() => {
        function loadLinks() {
            const linksRef = collection(db, "links")
            const queryRef = query(linksRef, orderBy("created", "asc"))

            getDocs(queryRef)
            .then((snapshot) => {
                let lista: Links[] = []

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
        }

        loadLinks()
    }, [])

    useEffect(() => {
        function loadSocialLinks() {
            const docRef = doc(db, "social", "link")

            getDoc(docRef)
            .then((snapshot: any) => {

                if(snapshot.data() != undefined) {
                    setSocialLinks({
                        facebook: snapshot.data().facebook,
                        instagram: snapshot.data().instagram,
                        youtube: snapshot.data().youtube,
                    })
                }
            })

        }

        loadSocialLinks()
    }, [])

    return (
        <div className='home-container'>
            <h1>DevLinks</h1>
            <span>Veja meus links 👇</span>

            <main className='links'>
                { links.map((link) => (
                    <section key={link.id} className='link-area' style={{ backgroundColor: link.bg}}>
                    <a href={link.url} target="_blank">
                        <p className='link-text'  style={{ color: link.color}}>{link.name}</p>
                    </a>
                    </section>
                ))}


               {links.length !== 0 && Object.keys(socialLinks).length > 0 && (
                 <footer>
                 <Social url={socialLinks?.facebook}>
                     <FaFacebook size={35} color="#fff" />
                 </Social>

                 <Social url={socialLinks?.youtube}>
                     <FaYoutube size={35} color="#fff" />
                 </Social>

                 <Social url={socialLinks?.instagram}>
                     <FaInstagram size={35} color="#fff" />
                 </Social>
             </footer>
               )}
            </main>
        </div>
    )
}