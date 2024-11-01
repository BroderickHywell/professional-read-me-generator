import './App.css'

// prevents the page from loading when you submit the form
let markdownContent
function handleForm(event){ 
  event.preventDefault() 
} 

function generateMarkdownContent() {
  // Creates the markdown file contents based on what the user inputed on the page
  let markdown = `# ${document.getElementById('title-input').value}`

  // checks for description
  if(document.getElementById('description-input').value !== ''){
    markdown += `\n## Description
    ${document.getElementById('description-input').value}`
  }

  // checks for installation
  if(document.getElementById('installation-input').value !== ''){
    markdown += `\n## Installation
    ${document.getElementById('installation-input').value}`
  }

  // checks for usage
  if(document.getElementById('usage-input').value !== ''){
    markdown += `\n## Usage
    ${document.getElementById('usage-input').value}`
  }

  // checks for credits
  if(document.getElementById('credits-input').value !== ''){
    markdown += `\n## Credits
    ${document.getElementById('credits-input').value}`
  }

  // checks for license
  if(document.getElementById('license-input').value !== ''){
    markdown += `\n## License
    ${document.getElementById('license-input').value}`
  }

  // checks for features
  if(document.getElementById('features-input').value !== ''){
    markdown += `\n## Features
    ${document.getElementById('features-input').value}`
  }

  // checks for contribution
  if(document.getElementById('contribution-input').value !== ''){
    markdown += `\n## Contribution
    ${document.getElementById('contribution-input').value}`
  }

  // checks for tests
  if(document.getElementById('tests-input').value !== ''){
    markdown += `\n## Tests
    ${document.getElementById('tests-input').value}`
  }

  console.log(markdown)
  return markdown
}

function downloadMarkdownFile(markdownContent) {
  markdownContent = generateMarkdownContent()
  if(document.getElementById('title-input').value !== ''){
    document.getElementById('tip-span').innerHTML = 'Happy Coding!'
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
    document.getElementById('tip-span').innerHTML = 'You at least gotta have a title to generate a markdown file.'
  }
}

function buttonStatus(){
  console.log('buttonstatus')
  document.getElementById('title-input').value === '' ?
    document.getElementById('download-button').style.display = 'none' :
    document.getElementById('download-button').style.display = 'flex'
}

function App() {
  return (
    <div className="App">
      <h1>readme.md generator</h1>
      <span id='tip-span'>pro tip: Hit tab to quickly jump between the inputs!</span>
      <form id='readme-form' onSubmit={handleForm}>
        <input type='text' onChange={buttonStatus} id='title-input' placeholder='project title(required)' required/>
        <input type='text' id='description-input' placeholder='description'/>
        <input type='text' id='installation-input' placeholder='installation'/>
        <input type='text' id='usage-input' placeholder='usage'/>
        <input type='text' id='credits-input' placeholder='credits'/>
        <input type='text' id='license-input' placeholder='license'/>
        <input type='text' id='features-input' placeholder='features'/>
        <input type='text' id='contribution-input' placeholder='contribution'/>
        <input type='text' id='tests-input' placeholder='tests'/>
        <button id='download-button' onClick={() => {downloadMarkdownFile(markdownContent)}}>download your readme.md</button>
      </form>
    </div>
  )
}

export default App