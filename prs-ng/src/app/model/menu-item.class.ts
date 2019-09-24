export class MenuItem {
    display: string;
    href: string;
    tooltip: string;

    constructor(dis: string, hrf: string, tt: string) {
        this.display = dis;
        this.href = hrf;
        this.tooltip = tt;
    }
}
