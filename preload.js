var suggestionUtility = (function(){
    const selectedSuggestions = {};
    let lastSelectedSuggestion = [];
    const fetchSuggestion = function(userInput){
        return autoSuggestData.filter((val)=>{
            const countryName = val && val.name && val.name.toLowerCase();
            const inputToCompare = userInput.toLowerCase();
            if(countryName.includes(inputToCompare))
                return val;
        })
    }
    const clearExistingSuggestion = function(){
        const ul  =   document.getElementById('autoCompleteSuggestions');
        ul.innerHTML= "";
    }
    const prepareSuggestionMarkup = function(suggestionArr){
        clearExistingSuggestion();
        const ul  =   document.getElementById('autoCompleteSuggestions');
        suggestionArr.forEach((val)=>{
            const li=document.createElement('li');
            li.innerHTML= val.name;
            li.setAttribute("class", "populatedSuggestions")
            li.onclick = function() {
                if(!selectedSuggestions[val.name]){
                    setLastSuggestion(val);
                }
                setSelectedSuggestion(val);
                prepareSelectedSuggestionMarkup();
                closeSuggestionArea();
                clearUserEnteredInput();
                prepareDetailsMarkup();
            }
            const shortName = document.createElement('span');
            shortName.setAttribute("class", "populatedSuggestionsShortName")
            shortName.innerHTML = ` :  ${val.name && val.name.substring(0,3)}`;
            li.appendChild(shortName);
            ul.appendChild(li);
            showSuggestionArea();
        });
    }
    const setSelectedSuggestion = function(suggestion){
        selectedSuggestions[suggestion.name]=suggestion;
    }
    const removeSelectedSuggestion = function(suggestionName){
        delete selectedSuggestions[suggestionName];
        lastSelectedSuggestion.splice(lastSelectedSuggestion.indexOf(suggestionName),1)
    }
    const clearSelectedSuggestionsMarkups = function(){
        const selectedSuggesArea  =   document.getElementById('selectedSuggestions');
        selectedSuggesArea.innerHTML = "";
        const detailsArea = document.getElementById('details');
        detailsArea.innerHTML = "";
    }
    const prepareSelectedSuggestionMarkup = function(){
        clearSelectedSuggestionsMarkups();
        const selectedSuggesArea  =   document.getElementById('selectedSuggestions');
        const selectedSuggestionsName = Object.keys(selectedSuggestions);
        selectedSuggestionsName.forEach((val,index)=>{
            const li=document.createElement('li');
            li.innerHTML= val.substring(0,3);
            li.setAttribute("class", "selectedSuggestions")
            const close = document.createElement("span");
            close.innerHTML = "X";
            close.setAttribute("class", "closeIcon");
            close.onclick = function() {
                removeSelectedSuggestion(val);
                prepareSelectedSuggestionMarkup();
                prepareDetailsMarkup();
            }
            li.appendChild(close);
            selectedSuggesArea.appendChild(li);
        });
    }
    const prepareDetailsMarkup = function(){
        const detailsArea = document.getElementById('details');
        const selectedSuggestionsValues = Object.values(selectedSuggestions);
        let markupValue = "";
        selectedSuggestionsValues.forEach((val)=>{
            markupValue+=JSON.stringify(val);
        })
        detailsArea.innerHTML = markupValue;
    }
    const closeSuggestionArea = function(){
        const suggestionArea = document.getElementById('autoCompleteSuggestions');
        suggestionArea.style.display = "none";
    }
    const showSuggestionArea = function(){
        const suggestionArea = document.getElementById('autoCompleteSuggestions');
        suggestionArea.style.display = "block";
    }
    const clearUserEnteredInput= function(){
        const autoCompleteInput = document.getElementById('autoCompleteInput');
        autoCompleteInput.value = "";
    }
    const removeLastSuggestion = function(){
        delete selectedSuggestions[lastSelectedSuggestion[lastSelectedSuggestion.length - 1]];
        lastSelectedSuggestion.pop();
        prepareSelectedSuggestionMarkup();
        prepareDetailsMarkup();
    }
    const setLastSuggestion= function(suggestion){
        lastSelectedSuggestion.push(suggestion.name)
    }
    const showNoHotelsFound = function(){
        const suggestionArea = document.getElementById('autoCompleteSuggestions');
        suggestionArea.innerHTML = "No Hotels Found";
    }
    return{
        fetchSuggestion,
        prepareSuggestionMarkup,
        removeLastSuggestion,
        showNoHotelsFound
    }
})();
