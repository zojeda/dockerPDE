export default class DockerDefinitionDirective implements ng.IDirective {
    restrict = 'E';
    template = require('./definitionEditor.html');
    controller = DockerDefinitionController;
    controllerAs = 'def';
    scope = {};
    bindToController = true;
    
    static instance = () => new DockerDefinitionDirective();
}



class DockerDefinitionController {
	schema = require('./schema.json');
	form = [
    "*",
    {
      type: "submit",
      title: "Save"
    }
  ];
	model = {};
  
  private _schemaText : string;
  
  public get schemaText() : string {
    return this._schemaText || JSON.stringify(this.schema, null, 2);
  }
  public set schemaText(v : string) {
    this._schemaText = v;
    this.schema = JSON.parse(v);
  }

}
