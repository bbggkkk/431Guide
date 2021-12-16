const list = [...document.querySelectorAll('[data-list]')];
const comStyle = window.getComputedStyle(document.body);

list.forEach(item => {
    const hold  = item.querySelector(':scope .text-wrap');
    const html  = hold.cloneNode(1);
    const style = item.getAttribute('data-style');
    hold.remove();

    const variable = getStepedVariable(item.getAttribute('data-list'));
    variable.forEach(($item,idx,arr) => {
        const row   = html.cloneNode(1);
        const value = comStyle.getPropertyValue(arr[idx]).toUpperCase();
        [...row.querySelectorAll('[data-key]')].forEach(item => {
            item.innerText = $item.match(/\d+/)[0];
        });
        [...row.querySelectorAll('[data-value]')].forEach(item => {
            item.innerText = value;
        });
        row.style[style] = value;
        item.append(row);
    });
});

function getStepedVariable(string = ''){
    const reg            = new RegExp(string);
    const allVariable    = getAllCSSVariableNames();
    const stepedVariable = allVariable.filter(item => (/\d+$/.test(item) && reg.test(item)));
    return stepedVariable;
}

function getAllCSSVariableNames(styleSheets = document.styleSheets){
    var cssVars = [];
    // loop each stylesheet
    for(var i = 0; i < styleSheets.length; i++){
       // loop stylesheet's cssRules
       try{ // try/catch used because 'hasOwnProperty' doesn't work
          for( var j = 0; j < styleSheets[i].cssRules.length; j++){
             try{
                // loop stylesheet's cssRules' style (property names)
                for(var k = 0; k < styleSheets[i].cssRules[j].style.length; k++){
                   let name = styleSheets[i].cssRules[j].style[k];
                   // test name for css variable signiture and uniqueness
                   if(name.startsWith('--') && cssVars.indexOf(name) == -1){
                      cssVars.push(name);
                   }
                }
             } catch (error) {}
          }
       } catch (error) {}
    }
    return cssVars;
}
 
function getElementCSSVariables (allCSSVars, element = document.body, pseudo){
    var elStyles = window.getComputedStyle(element, pseudo);
    var cssVars = {};
    for(var i = 0; i < allCSSVars.length; i++){
        let key = allCSSVars[i];
        let value = elStyles.getPropertyValue(key)
        if(value){cssVars[key] = value;}
    }
    return cssVars;
}