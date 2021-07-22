import {Component} from "vue";

export interface TopologyEditor {
    install: (Vue: any) => any;
}

declare let editor: TopologyEditor;
export default editor;
