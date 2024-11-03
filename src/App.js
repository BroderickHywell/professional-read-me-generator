import './App.css'
// prevents the page from loading when you submit the form
let markdownContent // defines markdown content to be used later by multiple functions
function handleForm(event){ event.preventDefault() } 

// function for getting data for 
function fetchUserInputData() {
  // creates markdown file based on what user inputed on page
  let markdown = `# ${document.getElementById('title-input').value}`
  
  // checks which parameters the user filled and adds them to the markdown data
  if(document.getElementById('description-input').value !== ''){markdown += `\n## Description \n${document.getElementById('description-input').value}`}
  if(document.getElementById('installation-input').value !== ''){markdown += `\n## Installation \n${document.getElementById('installation-input').value}`}
  if(document.getElementById('usage-input').value !== ''){markdown += `\n## Usage \n${document.getElementById('usage-input').value}`}
  if(document.getElementById('credits-input').value !== ''){markdown += `\n## Credits \n${document.getElementById('credits-input').value}`}
  if(document.getElementById('license-input').value !== ''){markdown += `\n## License \n${document.getElementById('license-input').value}`}
  if(document.getElementById('features-input').value !== ''){markdown += `\n## Features \n${document.getElementById('features-input').value}`}
  if(document.getElementById('contribution-input').value !== ''){markdown += `\n## Contribution \n${document.getElementById('contribution-input').value}`}
  if(document.getElementById('tests-input').value !== ''){markdown += `\n## Tests \n${document.getElementById('tests-input').value}`}

  return markdown
}

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

// sets the display of the download button so you can't press it if there is no project title
function buttonStatus(){
  document.getElementById('title-input').value === '' ?
    document.getElementById('download-button').style.display = 'none' :
    document.getElementById('download-button').style.display = 'flex'
}

function addField(event){
  event.preventDefault()
  if(document.getElementById('new-input-input').value !== ''){
    let inputForm = document.getElementById('inputs-div')
    let newField = document.createElement('input')
    let newFieldName = document.getElementById('new-input-input').value
    newField.setAttribute('type', 'text')
    newField.setAttribute('placeholder', newFieldName)
    newField.setAttribute('id', newFieldName)

    inputForm.appendChild(newField)
  }else{
    document.getElementById('new-input-input').value = 'enter a valid input'
  }
}

// main function
function App() {
  return (
    <div className="App">
      <h1>readme.md generator</h1>
      <span id='tip-span'>tip: Hit tab to quickly jump between the inputs! Also, adding two or more spaces will create a new line in the markdown document!</span>
      <span>Don't forget to bookmark this site to use for your other projects!</span>
      <form id='readme-form' onSubmit={handleForm}>
        <div id='inputs-div'>
          <input type='text' onChange={buttonStatus} id='title-input' placeholder='project title(required)' required/>
          <input type='text' id='description-input' placeholder='description'/>
          <input type='text' id='installation-input' placeholder='installation'/>
          <input type='text' id='usage-input' placeholder='usage'/>
          <input type='text' id='credits-input' placeholder='credits'/>
          <input type='text' id='license-input' placeholder='license'/>
          <input type='text' id='features-input' placeholder='features'/>
          <input type='text' id='contribution-input' placeholder='contribution'/>
          <input type='text' id='tests-input' placeholder='tests'/>
        </div>
        <button id='download-button' onClick={() => {downloadMarkdownFile(markdownContent)}}>download your readme.md</button>
      </form>
      <div className='custom-contact-buttons'>
        <form id='new-input-form' onSubmit={addField}>
          <button id='custom-input-button'>Add Custom Input</button>
          <input placeholder='new input name' type='text' id='new-input-input'/>
        </form>
        <a href='https://www.github.com/BroderickHywell' target='_blank' rel='noreferrer'><button className='contact-button'>Check out my github!</button></a>
      </div>
    </div>
  )
}

export default App