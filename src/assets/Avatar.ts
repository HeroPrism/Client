
import * as assets from "./index";

export const Avatar = (id: number) => {
    switch (id) {
        case 1:
        default:
            return assets.Avatar1;
        case 2:
            return assets.Avatar2
        case 3:
            return assets.Avatar3
        case 4:
            return assets.Avatar4
        case 5:
            return assets.Avatar5
        case 6:
            return assets.Avatar6
        case 7:
            return assets.Avatar7
        case 8:
            return assets.Avatar8
    }
}