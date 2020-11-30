import React from "react";

interface State {
    myValue: string
}

interface Props {
    appDir: string,
    library: string
}

export default class extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return <div></div>;
    }
}