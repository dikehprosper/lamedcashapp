interface Team {
    id: number;
    name: string;
    logo: string;
    colors: Colors;
}

interface Colors {
    player: ColorDetails;
    goalkeeper: ColorDetails;
}

interface ColorDetails {
    primary: string;
    number: string;
    border: string;
}

interface Player {
    id: number;
    name: string;
    number: number;
    pos: string;
    grid: string | null;
}

interface Substitute {
    player: Player;
}

interface StartXI {
    player: Player;
}

interface Coach {
    id: number;
    name: string;
    photo: string;
}

export interface LineupType {
    team: Team;
    formation: string;
    startXI: StartXI[];
    substitutes: Substitute[];
    coach: Coach;
}
