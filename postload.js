(function(){ 
    const autoCompleteInput = document.getElementById('autoCompleteInput');
    const enterSuggestionInput = document.getElementById('enterSuggestion');
    autoCompleteInput.addEventListener("input", function(e) {
        let userInput = this.value;
        const suggestions = suggestionUtility.fetchSuggestion(userInput);
        if(!suggestions || suggestions.length === 0){
            suggestionUtility.showNoHotelsFound();
        }else{
            suggestionUtility.prepareSuggestionMarkup(suggestions);
        }
        e.stopPropagation();
    })
    autoCompleteInput.addEventListener("keydown", function(e) {
        var key = event.keyCode || event.charCode;
        let userInput = this.value;
        if( key === 8 && userInput === ""){
            suggestionUtility.removeLastSuggestion();
        }
        e.stopPropagation();
    })
    enterSuggestionInput.addEventListener("click",function(e){
        document.getElementById('autoCompleteInput').focus();
        e.stopPropagation();
    })
})();
