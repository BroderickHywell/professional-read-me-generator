import './App.css'
let markdownContent     // defines markdown content to be used later by multiple functions
let sectionStorage = [`## Title`,`## Description`,`## Link`,`## Usage`,`## License`,`## Contribution`]
let selectedSection // used as a global variable for the functions to know which section is selected and in the editor

// grabs all the data from the page to be put into the readme.md file for the user
function fetchUserInputData() {
  // creates markdown file based on what user inputed on page
  let markdown = `# ${document.getElementById('title-input').value}`
  return markdown
}

// function that collects the markdown content and delivers it in a README.md file for the user to download
function downloadMarkdownFile(markdownContent) {
  markdownContent = fetchUserInputData()

  // checks for project title which is the bare minimum to create markdown file
  if(document.getElementById('title-input').value !== ''){
    document.getElementById('tip-span').innerHTML = 'Happy Coding!'

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
  }else{
    // code for when the project title input is empty and you submit the form
    document.getElementById('tip-span').innerHTML = 'You at least gotta have a title to generate a markdown file.'
  }
}

function displayInEditor(id){
  //gets specific section using unique id and displays it to the editor
  document.getElementById('section-editor').value = sectionStorage[id]
  selectedSection = id
}

function updateStorage(){
  //updates specific item in section storage based on whats in the editor
  sectionStorage[selectedSection] = document.getElementById('section-editor').value
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

function removeSection(){
  //get unique id of selected section and remove it from dom and section storage
  //reassign ids of section elements
  //also reset the editor to avoid any errors
}

// main function
function App() {
  return (
    <div className="App">
      <button id='download-button' onClick={() => {downloadMarkdownFile(markdownContent)}}>download your readme.md</button>
      <h1>readme.md generator</h1>
      <span className='start-span'>To edit a section, click on the text to the left of the delete button and it will show up in the editor on the right. Don't forget to bookmark this site to use for your other projects!</span>
      <div className='main-content-div'>
      <div className='sections-and-editor'>
        {/* sections */}
        <div>
          <h2 className='readme-sections-h2'>readme.md sections</h2>
          <div id='sections-div'>
            <div className='single-section-div' id='0'>
              <span className='section-span' onClick={() => displayInEditor(0)}>Title</span>
              <button className='section-button' onClick={() => removeSection(0)}>delete</button>
            </div>

            <div className='single-section-div' id='1'>
              <span className='section-span' onClick={() => displayInEditor(1)}>Description</span>
              <button className='section-button' onClick={() => removeSection(1)}>delete</button>
            </div>

            <div className='single-section-div' id='2'>
              <span className='section-span' onClick={() => displayInEditor(2)}>Link</span>
              <button className='section-button' onClick={() => removeSection(2)}>delete</button>
            </div>

            <div className='single-section-div' id='3'>
              <span className='section-span' onClick={() => displayInEditor(3)}>Usage</span>
              <button className='section-button' onClick={() => removeSection(3)}>delete</button>
            </div>

            <div className='single-section-div' id='4'>
              <span className='section-span' onClick={() => displayInEditor(4)}>License</span>
              <button className='section-button' onClick={() => removeSection(4)}>delete</button>
            </div>

            <div className='single-section-div' id='5'>
              <span className='section-span' onClick={() => displayInEditor(5)}>Contribute</span>
              <button className='section-button' onClick={() => removeSection(5)}>delete</button>
            </div>
          </div>
        </div>

        {/* text editor */}
        <div className='editor-div'>
          <h2>Section Editor</h2>
          <textarea id='section-editor' onChange={() => updateStorage()} rows="2" cols="25" placeholder='Select or create section.'></textarea>
        </div>

        {/* markdown preview */}
        {/* <div>
          <h2 className='markdown-preview-h2'>Markdown Preview</h2>
          <div id='markdown-preview'>
          </div>
        </div> */}
      </div>

        {/* new section form */}
        <form id='new-section-form' onSubmit={addSection}>
          <div className='new-section-div'>
            <input placeholder='create new section' id='new-section-input' maxLength={14}/>
            <button id='new-section-button'>+</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App