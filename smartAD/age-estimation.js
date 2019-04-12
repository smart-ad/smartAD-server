var PythoShell=require(python-shell);

var options={
    mode:'text',
    pythonPath:'',
    pythonOptions: ['-u'],
    scriptPath: '',
    args: ['value1', 'value2', 'value3']
}

PythonShell.run('demo.py')