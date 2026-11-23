// Central place to edit all personal details.
import profile from "../assets/rakib.jpeg"
export const personalInfo = {
  name: 'Rakib Hossen',
  brand: 'RAKIB.',
  title: 'Video Editor & Creative Visual Storyteller',
  tagline: 'Editing Stories. Creating Impact.',
  footerTagline: 'Better Edits. Bigger Stories.',
  email: 'hossaenrakib.offical@gmail.com',
  phone: '+88 01755354485',
  location: 'Mirpur, Bangladesh',
  socials: [
    { label: 'Facebook', url: 'https://www.facebook.com/share/19rHScepmw/' },
    { label: 'Instagram', url: 'https://www.instagram.com/ra.ho01?dmpr=NGRmb29kc2hqdGo4' },
    // YouTube / LinkedIn: none provided yet. Add { label, url } here when available.
  ],
  // Add your real numbers. Leave value as null to show a dash.
  stats: [
    { label: 'Projects completed', value: null },
    { label: 'Years editing', value: null },
    { label: 'Happy clients', value: null },
  ],
  // Set to an image URL or an imported file from src/assets to show your photo.
  profileImage: profile,
}
export const navLinks = [
  { label: 'Home', id: 'home' }, { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' }, { label: 'Portfolio', id: 'portfolio' },
  { label: 'Skills', id: 'skills' }, { label: 'Contact', id: 'contact' },
]
