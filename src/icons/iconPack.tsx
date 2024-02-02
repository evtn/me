import {
    Aeroplane,
    ArrowLeftRight,
    At,
    BrandGithub,
    BrandLinkedin,
    Briefcase,
    ChevronDoubleRight,
    Circle,
    Code,
    Copy,
    Desktop,
    Dollar,
    Download,
    Earth,
    ExternalLink,
    File,
    GitMerge,
    LinkTwo,
    Location,
    MaximizeOne,
    Play,
    Plus,
    RefreshAlt,
    Share,
    Snow,
    UsersGroup,
    X,
} from "@mynaui/icons-react";

import { Logo } from "@/components";

import { JSLogo, TSLogo } from "./CornerLogo";
import { EpamLogo } from "./EpamLogo";
import { InteticsLogo } from "./InteticsLogo";
import { MCCLogo } from "./MCCLogo";
import { PythonLogo } from "./PythonLogo";
import { ReactLogo } from "./ReactLogo";
import { TGIcon } from "./TGIcon";
import { IconBase } from "./base";
import { KartuliIcon } from "./kartuli";
import "./style.css";

export const iconList = {
    copy: Copy,
    intetics: InteticsLogo,
    mcc: MCCLogo,
    epam: EpamLogo,
    react: () => <ReactLogo variant="react" />,
    preact: () => <ReactLogo variant="preact" />,
    reactNative: () => <ReactLogo variant="react" />,
    python: PythonLogo,
    location: Location,
    at: At,
    telegram: TGIcon,
    github: BrandGithub,
    file: File,
    link: LinkTwo,
    code: Code,
    jotai: () => <span>Jōtai</span>,
    plane: Aeroplane,
    play: Play,
    javascript: JSLogo,
    typescript: TSLogo,
    earth: Earth,
    circle: Circle,
    desktop: Desktop,
    gitmerge: GitMerge,
    snow: Snow,
    briefcase: Briefcase,
    kartuli: KartuliIcon,
    rgx: () => <code>/a+/</code>,
    dollar: Dollar,
    plus: Plus,
    refreshalt: RefreshAlt,
    x: X,
    linkedin: BrandLinkedin,
    external: ExternalLink,
    expand: MaximizeOne,
    download: Download,
    share: Share,
    chevrondoubleright: ChevronDoubleRight,
    tab: ArrowLeftRight,
    users: UsersGroup,
    logo: () => <Logo />,
} as const satisfies Record<string, IconBase>;
