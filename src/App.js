import './App.css'
function handleForm(event){ event.preventDefault() } // prevents the page from loading when you submit the form
let markdownContent // defines markdown content to be used later by multiple functions
let sections = 1

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

  // creates containing div of the span and button elements for the new section
  let newSectionDiv = document.createElement('div')
  newSectionDiv.classList.add('single-section-div')
  newSectionDiv.id = sections.toString // id for deleting section

  // creates span with the new section title
  let newSectionSpan = document.createElement('span')
  newSectionSpan.innerHTML = document.getElementById('new-section-input').value
  newSectionSpan.classList.add('section-span')
  newSectionSpan.addEventListener('click', ()=>{displayInEditor(sections.toString)})

  // creates delete button for new section
  let newSectionButton = document.createElement('button')
  newSectionButton.innerHTML = 'delete'
  newSectionButton.classList.add('section-button')
  newSectionButton.addEventListener('click', ()=> { removeSection(sections.toString)})

  // adds elements to div, then adds the div to the page
  newSectionDiv.appendChild(newSectionSpan)
  newSectionDiv.appendChild(newSectionButton)
  document.getElementById('sections-div').appendChild(newSectionDiv)
  sections++ // increases so each new section has a unique id
}

// function that simply removes sections
function removeSection(sectionId){
    document.getElementById(sectionId).remove() 
}

function displayInEditor(sectionId){
  console.log('displaying')
  let editor = document.getElementById('section-editor')
  editor.value = `## ${document.getElementById(sectionId).querySelector('span').textContent}`
}

// main function
function App() {
  return (
    <div className="App">
      <button id='download-button' onClick={() => {downloadMarkdownFile(markdownContent)}}>download your readme.md</button>
      <h1>readme.md generator</h1>
      <span className='start-span'>To edit a section, click on the text to the left of the delete button and it will show up in the editor on the right. Don't forget to bookmark this site to use for your other projects!</span>
      <div className='main-content-div'>
      <h2 className='readme-sections-h2'>readme.md sections</h2>
      <div className='sections-and-editor'>
        {/* sections */}
        <div id='sections-div'>
          <div className='single-section-div' id='0'>
            <span className='section-span' onClick={() => displayInEditor(0)}>Title Of Project</span>
            <button className='section-button' onClick={() => removeSection(0)}>delete</button>
          </div>
        </div>

        {/* text editor */}
        <div className='editor-div'>
          <h2>Section Editor</h2>
          <textarea id='section-editor' rows="2" cols="25" defaultValue={'Select or create section to get started.'}></textarea>
        </div>
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