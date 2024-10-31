import './App.css'



function App() {
  return (
    <div className="App">
      <h1>readme.md generator</h1>
      <span>pro tip: hit tab to quickly jump between the inputs!</span>
      <form>
        <input type='text' placeholder='project title(required)' required/>
        <input type='text' placeholder='description'/>
        <input type='text' placeholder='installation'/>
        <input type='text' placeholder='usage'/>
        <input type='text' placeholder='credits'/>
        <input type='text' placeholder='license'/>
        <input type='text' placeholder='features'/>
        <input type='text' placeholder='contribution'/>
        <input type='text' placeholder='tests'/>
        <button>download your readme.md</button>
      </form>
    </div>
  )
}

export default App