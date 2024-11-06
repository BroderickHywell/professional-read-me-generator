let markdownContent     // defines markdown content to be used later by multiple functions
let sectionStorage = [`# Title`,`## Description`,`## Link`,`## Usage`,`## License`,`## Contribution`]
let selectedSection // used as a global variable for the functions to know which section is selected and in the editor


// grabs all the data from the page to be put into the readme.md file for the user
function fetchUserInputData() {
  // creates markdown file based on what user inputed on page
  let markdown = ``
  sectionStorage.forEach((section) => markdown += `${section} \n`)
  return markdown
}

// function that collects the markdown content and delivers it in a README.md file for the user to download
function downloadMarkdownFile(markdownContent) {
  markdownContent = fetchUserInputData()

  // checks for project title which is the bare minimum to create markdown file

  // code creates markdown link, autoselects it then removes it so the download can start right as the download button is pressed
  const blob = new Blob([markdownContent], { type: "text/markdown" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "README.md"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  // code for when the project title input is empty and you submit the form
  document.getElementById('tip-span').innerHTML = 'You at least gotta have a title to generate a markdown file.'
}

function displayInEditor(sectionId){
  //gets specific section using unique id and displays it to the editor
  document.getElementById('section-editor').value = sectionStorage[sectionId]
  selectedSection = sectionId // this tells the editor which section is selected so it can edit the storage properly
}

function updateStorage(){
  //updates specific item in section storage based on whats in the editor
  if(sectionStorage[selectedSection]){
    sectionStorage[selectedSection] = document.getElementById('section-editor').value
  }
}

function addSection(event){
  event.preventDefault() // prevents page from refreshing on form submission

  // create div and add proper attributes
  let newDiv = document.createElement('div')
  newDiv.id = sectionStorage.length
  newDiv.classList.add('single-section-div')

  // create span and add proper attributes
  let newSpan = document.createElement('span')
  newSpan.classList.add('section-span')
  newSpan.addEventListener('click', ()=>displayInEditor(newDiv.id))
  newSpan.innerText = document.getElementById('new-section-input').value

  // create button and add proper attributes
  let newButton = document.createElement('button')
  newButton.classList.add('section-button')
  newButton.addEventListener('click', ()=>removeSection(newDiv.id))
  newButton.innerText = 'delete'

  // add new elements into the div, then add div to dom
  newDiv.appendChild(newSpan)
  newDiv.appendChild(newButton)
  document.getElementById('sections-div').appendChild(newDiv)

  //add to the section storage
  sectionStorage.push(`## ${document.getElementById('new-section-input').value}`)
}

function removeSection(elmToRemoveId){
  if(elmToRemoveId === selectedSection){document.getElementById('section-editor').value = ''}
  document.getElementById(elmToRemoveId).remove()
  sectionStorage.splice(elmToRemoveId,1)
  for(let i=0; i<document.getElementById('sections-div').childElementCount; i++){
    let oldSpanTitle = document.getElementById('sections-div').children[i].querySelector('span').innerText
    document.getElementById('sections-div').children[i].querySelector('span').remove()
    document.getElementById('sections-div').children[i].querySelector('button').remove()

    let newSpan = document.createElement('span')
    newSpan.classList.add('section-span')
    newSpan.addEventListener('click', ()=>displayInEditor(i))
    newSpan.innerText = oldSpanTitle

    let newButton = document.createElement('button')
    newButton.classList.add('section-button')
    newButton.addEventListener('click', ()=>removeSection(i))
    newButton.innerText = 'delete'

    document.getElementById('sections-div').children[i].appendChild(newSpan)
    document.getElementById('sections-div').children[i].appendChild(newButton)
    document.getElementById('sections-div').children[i].id = i
  }

}

document.getElementById(0).children[0].addEventListener('click', ()=> displayInEditor(0), true)
document.getElementById(1).children[0].addEventListener('click', ()=> displayInEditor(1), true)
document.getElementById(2).children[0].addEventListener('click', ()=> displayInEditor(2), true)
document.getElementById(3).children[0].addEventListener('click', ()=> displayInEditor(3), true)
document.getElementById(4).children[0].addEventListener('click', ()=> displayInEditor(4), true)
document.getElementById(5).children[0].addEventListener('click', ()=> displayInEditor(5), true)

document.getElementById(0).children[1].addEventListener('click', ()=> removeSection(0), true)
document.getElementById(1).children[1].addEventListener('click', ()=> removeSection(1), true)
document.getElementById(2).children[1].addEventListener('click', ()=> removeSection(2), true)
document.getElementById(3).children[1].addEventListener('click', ()=> removeSection(3), true)
document.getElementById(4).children[1].addEventListener('click', ()=> removeSection(4), true)
document.getElementById(5).children[1].addEventListener('click', ()=> removeSection(5), true)

document.getElementById('new-section-form').addEventListener('submit', addSection)
document.getElementById('section-editor').addEventListener('change', updateStorage)
document.getElementById('download-button').addEventListener('click', downloadMarkdownFile)