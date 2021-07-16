import Box from '../Box'
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons'

export default function ProfileSidebar({ githubUser }) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${githubUser}.png`}
        alt="avatar profile"
        style={{ borderRadius: '8px' }}
      />
      <hr />

      <a href={`https://github.com/${githubUser}`} className="boxLink">
        {githubUser}
      </a>

      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}
