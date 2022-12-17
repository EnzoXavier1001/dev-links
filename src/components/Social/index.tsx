import './style.css'

type SocialProps = {
    children?: JSX.Element,
    url?: string
}

export function Social( { children, url }: SocialProps) {
    return (
        <a className='social' rel='noopener noreferrer' href={url} target="_blank">
            { children }
        </a>
    )
}