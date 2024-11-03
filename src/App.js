import './App.css'
function handleForm(event){ event.preventDefault() } // prevents the page from loading when you submit the form
let markdownContent // defines markdown content to be used later by multiple functions
let inputCount = 8 // inputCount keeps track of how many new inputs the user creates

// function that grabs the custom inputs made by the user
function addNewInputsToMarkdown(markdown){
  for(let i=8; i<inputCount; i++){
    if(document.getElementById(`${i}`).value !== ''){markdown += `\n## ${document.getElementById(`${i}`).attributes.placeholder.value} \n${document.getElementById(`${i}`).value}`}
  }
  return markdown
}

// grabs all the data from the page to be put into the readme.md file for the user
function fetchUserInputData() {
  // creates markdown file based on what user inputed on page
  let markdown = `# ${document.getElementById('title-input').value}`
  
  // checks which parameters the user filled and adds them to the markdown data
  if(document.getElementById('0').value !== ''){markdown += `\n## Description \n${document.getElementById('0').value}`}
  if(document.getElementById('1').value !== ''){markdown += `\n## Installation \n${document.getElementById('1').value}`}
  if(document.getElementById('2').value !== ''){markdown += `\n## Usage \n${document.getElementById('2').value}`}
  if(document.getElementById('3').value !== ''){markdown += `\n## Credits \n${document.getElementById('3').value}`}
  if(document.getElementById('4').value !== ''){markdown += `\n## License \n${document.getElementById('4').value}`}
  if(document.getElementById('5').value !== ''){markdown += `\n## Features \n${document.getElementById('5').value}`}
  if(document.getElementById('6').value !== ''){markdown += `\n## Contribution \n${document.getElementById('6').value}`}
  if(document.getElementById('7').value !== ''){markdown += `\n## Tests \n${document.getElementById('7').value}`}
  if(document.getElementById('8')){
    markdown = addNewInputsToMarkdown(markdown)
  }
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
    let newFieldId = inputCount
    inputCount += 1
    newField.setAttribute('type', 'text')
    newField.setAttribute('placeholder', document.getElementById('new-input-input').value)
    newField.setAttribute('id', newFieldId)

    inputForm.appendChild(newField)
  }else{
    document.getElementById('new-input-input').value = 'can\'t be empty'
    document.getElementById('new-input-input').select()
  }
}

// main function
function App() {
  return (
    <div className="App">
      <h1>readme.md generator</h1>
      <span id='tip-span'>tip: Hit tab to quickly jump between the inputs! Also, adding two or more spaces will create a new line in the markdown document!</span>
      <span>Leave any values you don't want empty</span>
      <span>Don't forget to bookmark this site to use for your other projects!</span>
      <form id='readme-form' onSubmit={handleForm}>
        <div id='inputs-div'>
          <input type='text' onChange={buttonStatus} id='title-input' placeholder='project title(required)' required/>
          <input type='text' id='0' placeholder='description'/>
          <input type='text' id='1' placeholder='installation'/>
          <input type='text' id='2' placeholder='usage'/>
          <input type='text' id='3' placeholder='credits'/>
          <input type='text' id='4' placeholder='license'/>
          <input type='text' id='5' placeholder='features'/>
          <input type='text' id='6' placeholder='contribution'/>
          <input type='text' id='7' placeholder='tests'/>
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