var tasks = [];
var lastRender = 0;
window.requestAnimationFrame(gameLoop)

function initalizeTask() {
  var name = document.getElementById("name").value
  var interval = document.getElementById("interval").value
  var num = document.getElementById("num").value
  tasks.push({name: name, interval: interval, num: num, startTime: performance.now(), latestRender: null, render: false})
  resetValues();
}

function gameLoop(timestamp) {
  update(timestamp) // go through items and see if render attribute should be set to true
  render() // write to browser
  window.requestAnimationFrame(gameLoop)
}

function update(timestamp) {
  _.forEach(tasks, (task, index)=>{
    let time = task.latestRender || task.startTime;
    let isReady = timestamp - time > parseInt(task.interval) ? true : false;
    if(isReady){
    task.render = true;
    task.latestRender = performance.now();
    task.num -= 1 // Lower the ramaining amount
      if(task.num < 0){
          tasks.splice(index, 1) // Take out of tasks
      }
    } else { task.render = false; }
  });
}

function render() {
  var node = document.getElementById("displayevent");
  _.forEach(tasks, (task)=>{
    if(task.render){
      node.innerHTML += `<p> Event: ${task.name}  (${task.num} remaining) </p>`;
    }
  })
}

function resetValues() {
  document.getElementById("name").value = ""
  document.getElementById("interval").value = ""
  document.getElementById("num").value = ""
}
