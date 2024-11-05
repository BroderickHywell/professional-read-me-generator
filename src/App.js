import './App.css'
function handleForm(event){ event.preventDefault() } // prevents the page from loading when you submit the form
let markdownContent // defines markdown content to be used later by multiple functions

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

// main function
function App() {
  return (
    <div className="App">
      <h1>readme.md generator</h1>
      <span className='start-span'>To edit a section, click on the text to the left of the delete button and it will show up in the editor on the right. Don't forget to bookmark this site to use for your other projects!</span>
      <button id='download-button' onClick={() => {downloadMarkdownFile(markdownContent)}}>download your readme.md</button>
      <form id='readme-form' onSubmit={handleForm}>
        <div id='sections-div'>
          <h2>readme.md sections</h2>
          <div className='single-section-div'>
            <span className='section-span'>Title Of Project</span>
            <button className='section-button'>delete</button>
          </div>
        </div>
        <div className='editor-div'>
          <h2>Section Editor</h2>
         <textarea rows="2" cols="25"></textarea>
        </div>
      </form>
    </div>
  )
}

export default App