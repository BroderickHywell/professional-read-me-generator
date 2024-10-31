import './App.css'

// PREVENTS THE PAGE FROM RELOADING WHEN YOU SUBMIT THE FORM
function handleForm(event) { event.preventDefault() } 

function generateMarkdownContent() {
  // Example content
  const markdown = `# Heading 1
  This is some markdown text.

  ## Heading 2
  - List item 1
  - List item 2`

  return markdown
}

function downloadMarkdownFile(markdownContent) {
  if(document.getElementById('title-input').value !== ''){
    document.getElementById('tip-span').innerHTML = 'Happy Coding!'
    const blob = new Blob([markdownContent], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
  
    const link = document.createElement("a")
    link.href = url
    link.download = "generated.md"
    link.textContent = "Download Markdown File"
  
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }else{
    document.getElementById('tip-span').innerHTML = 'You at least gotta have a title to generate a markdown file.'
  }
}
const markdownContent = generateMarkdownContent()

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
        <input type='text' placeholder='description'/>
        <input type='text' placeholder='installation'/>
        <input type='text' placeholder='usage'/>
        <input type='text' placeholder='credits'/>
        <input type='text' placeholder='license'/>
        <input type='text' placeholder='features'/>
        <input type='text' placeholder='contribution'/>
        <input type='text' placeholder='tests'/>
        <button id='download-button' onClick={() => {downloadMarkdownFile(markdownContent)}}>download your readme.md</button>
      </form>
    </div>
  )
}

export default App