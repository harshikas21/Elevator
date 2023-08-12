const floorsContainer = document.querySelector('.floors');
const liftsContainer = document.querySelector('.lifts');
let numFloors, numLifts;

document.getElementById('create-btn').addEventListener('click', createLiftsAndFloors);

function createLiftsAndFloors() {
    numFloors = parseInt(document.getElementById('num-floors').value);
    numLifts = parseInt(document.getElementById('num-lifts').value);

    if (isNaN(numFloors) || isNaN(numLifts)) {
        alert('Please enter valid numbers for floors and lifts.');
        return;
    }

    createFloors();
    createLifts();
}

function createFloors() {
    floorsContainer.innerHTML = '';
    for (let i = numFloors; i >= 1; i--) {
        const floorButton = document.createElement('button');
        floorButton.classList.add('floor-button');
        floorButton.textContent = i;
        floorButton.addEventListener('click', () => requestLift(i));
        floorsContainer.appendChild(floorButton);
    }
}

function createLifts() {
    liftsContainer.innerHTML = '';
    for (let i = 1; i <= numLifts; i++) {
        const lift = document.createElement('div');
        lift.classList.add('lift');
        lift.dataset.id = i;
        lift.dataset.currentFloor = 1;
        liftsContainer.appendChild(lift);
    }
}

function requestLift(floor) {
    const lifts = document.querySelectorAll('.lift');
    const closestLift = getClosestLift(floor, lifts);
    
    if (closestLift) {
        moveLift(closestLift, floor);
    }
}

function getClosestLift(floor, lifts) {
    let closestLift = null;
    let minDistance = Infinity;
    
    lifts.forEach(lift => {
        const liftFloor = parseInt(lift.dataset.currentFloor);
        const distance = Math.abs(liftFloor - floor);
        
        if (distance < minDistance) {
            minDistance = distance;
            closestLift = lift;
        }
    });

    return closestLift;
}

function moveLift(lift, targetFloor) {
    const liftId = lift.dataset.id;
    const liftFloor = parseInt(lift.dataset.currentFloor);

    if (liftFloor === targetFloor) {
        return;
    }

    lift.textContent = `Lift ${liftId} [${liftFloor} -> ${targetFloor}]`;
    setTimeout(() => {
        lift.dataset.currentFloor = targetFloor;
        lift.textContent = `Lift ${liftId} [${targetFloor}]`;
    }, Math.abs(targetFloor - liftFloor) * 1000); 
}
