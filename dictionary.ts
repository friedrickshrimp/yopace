
//  Dependencies


  

interface DefinitionCallback { (result, error): void }
interface IGetSearchURL {(key: string ) : void}
interface IDefinitionRequest {(word : string, callback : DefinitionCallback) : void}
  



interface IDictionary {
    getSearchUrl(word : string): string;
    raw : void;
    define: void;
}
//  Dictionary constructor
var Dictionary =  {
    getSearchUrl: function (word:string) {

    }
}


    
    //constructs the search url
    this.getSearchUrl = function(word : string){

    }


    //return a javascript object equivalent to the XML response from M-W
    this.raw = function(word : string, callback : DefinitionCallback){
        const url : string = this.getSearchUrl(word);
        
  
    };


      //returns a word's definition
      this.define =  function(word : string, callback : DefinitionCallback){

    };
    
