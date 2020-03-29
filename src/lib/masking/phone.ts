const PHONE_MATCH = /(\d{0,3})(\d{0,3})(\d{0,4})/;

export const phone = (value?: string) => {
    if (value == null) {
        return "";
    }

    const matches = value.replace(/\D/g, "").match(PHONE_MATCH);
    let builder = "";

    if (matches != null) {
        const area = matches[1];
        const prefix = matches[2];
        const line = matches[3];

        if (prefix !== "") {
            builder += `(${area}) ${prefix}`;
        } else {
            builder += `${area}`;
        }

        if (line !== "") {
            builder += `-${line}`;
        }
    }

    return builder;
};
