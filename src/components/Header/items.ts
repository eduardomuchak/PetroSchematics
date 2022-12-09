import { IconType } from 'react-icons';
import { BsPalette } from 'react-icons/bs';
import { FaProjectDiagram } from 'react-icons/fa';
import { FiHome, FiSettings } from 'react-icons/fi';
interface LinkItemProps {
  name: string;
  icon: IconType;
  link?: string;
  children: any[];
}

interface Children {
  name: string;
  icon: IconType;
  link: string;
}

const childrenCarteiradeProjetos = [{ name: 'Esquemático Well', icon: FaProjectDiagram, link: '/esquematico-well' }];
const childrenConfiguracoes = [{ name: 'Style Guide', icon: BsPalette, link: '/style-guide' }];

export const LinkItems: Array<LinkItemProps> = [
  {
    name: 'Projetos',
    icon: FiHome,
    children: childrenCarteiradeProjetos.sort((a: Children, b: Children) => a.name.localeCompare(b.name)),
  },
  {
    name: 'Desenvolvimento',
    icon: FiSettings,
    children: childrenConfiguracoes.sort((a: Children, b: Children) => a.name.localeCompare(b.name)),
  },
];
