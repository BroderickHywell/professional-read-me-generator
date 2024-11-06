import './App.css'
function handleForm(event){ event.preventDefault() } // prevents the page from loading when you submit the form
let markdownContent     // defines markdown content to be used later by multiple functions
let sections = 6        // variable for creating unique id's for each section
let sectionStorage = [[0, `# Title`], [1,`## Description`], [2,`## Link`], [3,`## Usage`], [4,`## License`], [5,`## Contribution`]] // array for holding the markdown content for each section
let selectedSection = 0 // variable for keeping track of the section that is selected

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

// adds new section to the page based on user input
function addSection(event){
  event.preventDefault() // prevents page from refreshing

  if(document.getElementById('new-section-input').value !== ''){
    console.log(`sections before addition ${sections}`)
    // add new item to section storage array
    sectionStorage.push([sections, `## ${document.getElementById('new-section-input').value}`])
    console.log([sections, `## ${document.getElementById('new-section-input').value}`])
    
    // creates containing div of the span and button elements for the new section
    let newSectionDiv = document.createElement('div')
    newSectionDiv.classList.add('single-section-div')
    newSectionDiv.id = sections.toString // id for deleting section
    
    // creates span with the new section title
    let newSectionSpan = document.createElement('span')
    newSectionSpan.innerHTML = document.getElementById('new-section-input').value
    newSectionSpan.classList.add('section-span')
    newSectionSpan.addEventListener('click', ()=>{displayInEditor(sections)})
  
    // creates delete button for new section
    let newSectionButton = document.createElement('button')
    newSectionButton.innerHTML = 'delete'
    newSectionButton.classList.add('section-button')
    newSectionButton.addEventListener('click', ()=> { removeSection(sections.toString)})
  
    console.log(`section storage here ${sectionStorage}`)
    // adds elements to div, then adds the div to the page
    newSectionDiv.appendChild(newSectionSpan)
    newSectionDiv.appendChild(newSectionButton)
    document.getElementById('sections-div').appendChild(newSectionDiv)
    sections++ // increases so each new section has a unique id
  }else {
    document.getElementById('new-section-input').value = 'cannot be empty'
    document.getElementById('new-section-input').select()
  }
}

// function that simply removes sections
function removeSection(sectionId){
    for(let i=0; i<sectionStorage.length; i++){
      if(sectionStorage[i][0] === sectionId){
        sectionStorage.splice(i,1)
      }
    }
    console.log(sectionStorage)
    document.getElementById(sectionId).remove()
    document.getElementById('section-editor').value = ''
}

function displayInEditor(sectionId){
  console.log('displaying')
  if(sectionId >= 6){sectionId -= 1}
  selectedSection = sectionId
  console.log(`selected section ${selectedSection}`)
  console.log(`sectionID ${sectionId}`)
  for(let i=0; i<sectionStorage.length; i++){
    console.log(`Section storage ${sectionStorage[i][0]} checking with section id: ${sectionId}`)
    if(sectionStorage[i][0] === sectionId){
      console.log('yay')
      document.getElementById('section-editor').value = sectionStorage[i][1]
    }
  }
}

// function updatePreview(selectedId){
//   console.log('updating preview')
//   let sectionHeader = document.getElementById(selectedId).querySelector('span').textContent
//   let sectionHeaderPreview = document.createElement('h3')
//   sectionHeaderPreview.textContent = sectionHeader

//   let sectionContent = document.getElementById('')
//   let markdownPreview = document.getElementById('markdown-preview')
//   markdownPreview.appendChild(sectionHeaderPreview)
// }

function updateStorage(){
  console.log('updating')
  for(let i=0; i<sectionStorage.length; i++){
    if(sectionStorage[i][0] === selectedSection){
      sectionStorage[i][1] = document.getElementById('section-editor').value
    }
  }
  console.log(sectionStorage[0][1])
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