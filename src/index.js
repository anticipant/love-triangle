/**
 * @param preferences - an array of integers. Indices of people, whom they love
 * @returns number of love triangles
 */
module.exports = function getLoveTrianglesCount(preferences = []) {
    let loverCounter = 0;

    const findTriangle = (number, numberIndex, arr) => {
        let array = arr.slice();
        array[numberIndex] = null;
        let targetLovers = [numberIndex]; // index-ы
        let nextLover = number; //порядковый номер, берем из значения массива

        for (let i = 0; i < 2; i++) {
            const who = nextLover - 1; // index  текущего любовника
            const whom = array[who];
            if (whom) { // он существует
                targetLovers.push(who); // записываем индекс 2(3)-го любовника
                nextLover = whom;
            } else {
                return
            }
            if (i === 1) {
                if (nextLover - 1 !== targetLovers[0]) {
                    // не замкнулся
                    targetLovers = [];
                }
            }
        }

        return targetLovers.length === 3 ? targetLovers : null;
    };

    let lovers = preferences.slice();

    lovers.forEach((it, index, array) => {
        if (it === null) {
            return
        }

        let triangleUnits = findTriangle(it, index, array);

        if (triangleUnits) {
            triangleUnits.forEach((it) => {
                array[it] = null;
            });
            loverCounter++;

        }
    });

    return loverCounter;
};
