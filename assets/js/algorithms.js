document.addEventListener('DOMContentLoaded', () => {
  const algorithmData = {
    bubble: {
      title: 'Bubble Sort',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      example: 'Starting array: [64, 34, 25, 12, 22, 11, 90]. Bubble Sort repeatedly compares neighbours. 64 and 34 swap, then 64 and 25 swap, and the process continues until 90 is in place and the largest value “bubbles” to the end.',
      code: `import java.util.Arrays;

public class BubbleSort {
    public static void bubbleSort(int[] array) {
        int n = array.length;

        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;

            for (int j = 0; j < n - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    int temporary = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temporary;
                    swapped = true;
                }
            }

            if (!swapped) {
                break;
            }
        }
    }

    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(numbers);
        System.out.println(Arrays.toString(numbers));
    }
}`
    },
    insertion: {
      title: 'Insertion Sort',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      example: 'Starting array: [64, 34, 25, 12, 22, 11, 90]. Each value is inserted into the correct position in the sorted portion on its left, like placing cards in order.',
      code: `import java.util.Arrays;

public class InsertionSort {
    public static void insertionSort(int[] array) {
        for (int i = 1; i < array.length; i++) {
            int key = array[i];
            int j = i - 1;

            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j--;
            }

            array[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        insertionSort(numbers);
        System.out.println(Arrays.toString(numbers));
    }
}`
    },
    selection: {
      title: 'Selection Sort',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      example: 'Starting array: [64, 34, 25, 12, 22, 11, 90]. The algorithm finds the smallest remaining value and moves it to the next sorted position.',
      code: `import java.util.Arrays;

public class SelectionSort {
    public static void selectionSort(int[] array) {
        for (int i = 0; i < array.length - 1; i++) {
            int minimumIndex = i;

            for (int j = i + 1; j < array.length; j++) {
                if (array[j] < array[minimumIndex]) {
                    minimumIndex = j;
                }
            }

            int temporary = array[i];
            array[i] = array[minimumIndex];
            array[minimumIndex] = temporary;
        }
    }

    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        selectionSort(numbers);
        System.out.println(Arrays.toString(numbers));
    }
}`
    },
    merge: {
      title: 'Merge Sort',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)',
      example: 'Starting array: [64, 34, 25, 12, 22, 11, 90]. Merge Sort splits the array into smaller halves, sorts those halves, and merges them back together in order.',
      code: `import java.util.Arrays;

public class MergeSort {
    public static void mergeSort(int[] array, int left, int right) {
        if (left >= right) {
            return;
        }

        int middle = left + (right - left) / 2;
        mergeSort(array, left, middle);
        mergeSort(array, middle + 1, right);
        merge(array, left, middle, right);
    }

    private static void merge(int[] array, int left, int middle, int right) {
        int[] temporary = new int[right - left + 1];
        int i = left;
        int j = middle + 1;
        int k = 0;

        while (i <= middle && j <= right) {
            if (array[i] <= array[j]) {
                temporary[k++] = array[i++];
            } else {
                temporary[k++] = array[j++];
            }
        }
        while (i <= middle) temporary[k++] = array[i++];
        while (j <= right) temporary[k++] = array[j++];

        System.arraycopy(temporary, 0, array, left, temporary.length);
    }

    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        mergeSort(numbers, 0, numbers.length - 1);
        System.out.println(Arrays.toString(numbers));
    }
}`
    },
    quick: {
      title: 'Quick Sort',
      average: 'O(n log n)',
      worst: 'O(n²)',
      space: 'O(log n)',
      example: 'Starting array: [64, 34, 25, 12, 22, 11, 90]. Quick Sort chooses a pivot, moves smaller values to the left and larger values to the right, then repeats the process on both sides.',
      code: `import java.util.Arrays;

public class QuickSort {
    public static void quickSort(int[] array, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(array, low, high);
            quickSort(array, low, pivotIndex - 1);
            quickSort(array, pivotIndex + 1, high);
        }
    }

    private static int partition(int[] array, int low, int high) {
        int pivot = array[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (array[j] <= pivot) {
                i++;
                int temporary = array[i];
                array[i] = array[j];
                array[j] = temporary;
            }
        }

        int temporary = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temporary;
        return i + 1;
    }

    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        quickSort(numbers, 0, numbers.length - 1);
        System.out.println(Arrays.toString(numbers));
    }
}`
    }
  };

  const tabs = document.querySelectorAll('.algorithm-tab');
  const barsContainer = document.getElementById('array-bars');
  const arrayInput = document.getElementById('array-input');
  const arrayHelp = document.getElementById('array-help');
  const playButton = document.getElementById('play-button');
  const stepButton = document.getElementById('step-button');
  const resetButton = document.getElementById('reset-button');
  const randomButton = document.getElementById('random-array');
  const speedRange = document.getElementById('speed-range');
  const stepCount = document.getElementById('step-count');
  const stepTotal = document.getElementById('step-total');
  const stepDescription = document.getElementById('step-description');
  const javaCode = document.getElementById('java-code');
  const algorithmExample = document.getElementById('algorithm-example');
  const visualizerTitle = document.getElementById('visualizer-title');
  const codeHeading = document.getElementById('code-heading');
  const copyCode = document.getElementById('copy-code');

  let currentAlgorithm = 'bubble';
  let initialArray = [];
  let steps = [];
  let stepIndex = 0;
  let timer = null;

  function parseArray() {
    const values = arrayInput.value.split(',').map(value => value.trim()).filter(Boolean).map(Number);
    const valid = values.length >= 5 && values.length <= 12 && values.every(value => Number.isInteger(value) && value >= 1 && value <= 99);
    if (!valid) {
      arrayHelp.textContent = 'Enter 5–12 whole numbers between 1 and 99, separated by commas.';
      arrayHelp.classList.add('error');
      return null;
    }
    arrayHelp.textContent = 'Use 5–12 numbers from 1 to 99.';
    arrayHelp.classList.remove('error');
    return values;
  }

  function snapshot(array, active = [], compared = [], sorted = [], description = '') {
    steps.push({
      array: [...array],
      active: [...active],
      compared: [...compared],
      sorted: [...sorted],
      description
    });
  }

  function generateBubbleSort(array) {
    const working = [...array];
    const sorted = new Set();
    snapshot(working, [], [], [], 'Start with the original array. Adjacent values will be compared from left to right.');
    for (let i = 0; i < working.length - 1; i++) {
      let swapped = false;
      for (let j = 0; j < working.length - i - 1; j++) {
        snapshot(working, [j, j + 1], [j, j + 1], [...sorted], `Compare ${working[j]} and ${working[j + 1]}.`);
        if (working[j] > working[j + 1]) {
          [working[j], working[j + 1]] = [working[j + 1], working[j]];
          swapped = true;
          snapshot(working, [j, j + 1], [j, j + 1], [...sorted], `Swap ${working[j + 1]} and ${working[j]}.`);
        }
      }
      sorted.add(working.length - i - 1);
      snapshot(working, [], [], [...sorted], `${working.length - i - 1} is now in its sorted position.`);
      if (!swapped) {
        for (let k = 0; k < working.length - i - 1; k++) sorted.add(k);
        break;
      }
    }
    snapshot(working, [], [], [...Array(working.length).keys()], `Finished! The array is sorted: [${working.join(', ')}].`);
  }

  function generateInsertionSort(array) {
    const working = [...array];
    snapshot(working, [0], [], [0], 'The first value is already treated as a sorted section.');
    for (let i = 1; i < working.length; i++) {
      const key = working[i];
      let j = i - 1;
      snapshot(working, [i], [], [...Array(i).keys()], `Take ${key} and insert it into the sorted section on the left.`);
      while (j >= 0 && working[j] > key) {
        snapshot(working, [j, j + 1], [j, j + 1], [...Array(i).keys()], `${working[j]} is larger than ${key}, so it shifts right.`);
        working[j + 1] = working[j];
        j--;
      }
      working[j + 1] = key;
      snapshot(working, [j + 1], [], [...Array(i + 1).keys()], `Insert ${key} at position ${j + 1}.`);
    }
    snapshot(working, [], [], [...Array(working.length).keys()], `Finished! The array is sorted: [${working.join(', ')}].`);
  }

  function generateSelectionSort(array) {
    const working = [...array];
    const sorted = new Set();
    snapshot(working, [], [], [], 'Start by finding the smallest value in the unsorted section.');
    for (let i = 0; i < working.length - 1; i++) {
      let minimum = i;
      for (let j = i + 1; j < working.length; j++) {
        snapshot(working, [minimum, j], [minimum, j], [...sorted], `Compare the current minimum ${working[minimum]} with ${working[j]}.`);
        if (working[j] < working[minimum]) minimum = j;
      }
      snapshot(working, [i, minimum], [i, minimum], [...sorted], `The minimum is ${working[minimum]}. Swap it into position ${i}.`);
      [working[i], working[minimum]] = [working[minimum], working[i]];
      sorted.add(i);
      snapshot(working, [i], [], [...sorted], `Position ${i} is now sorted.`);
    }
    snapshot(working, [], [], [...Array(working.length).keys()], `Finished! The array is sorted: [${working.join(', ')}].`);
  }

  function generateMergeSort(array) {
    const working = [...array];
    snapshot(working, [], [], [], 'Divide the array into smaller halves, then merge them in sorted order.');

    function merge(left, middle, right) {
      const temporary = [];
      let i = left;
      let j = middle + 1;
      while (i <= middle && j <= right) {
        snapshot(working, [i, j], [i, j], [], `Compare ${working[i]} and ${working[j]} in the merge step.`);
        if (working[i] <= working[j]) temporary.push(working[i++]);
        else temporary.push(working[j++]);
      }
      while (i <= middle) temporary.push(working[i++]);
      while (j <= right) temporary.push(working[j++]);
      for (let k = 0; k < temporary.length; k++) {
        working[left + k] = temporary[k];
      }
      const merged = [];
      for (let k = left; k <= right; k++) merged.push(k);
      snapshot(working, merged, [], merged, `Merge positions ${left}–${right}: [${temporary.join(', ')}].`);
    }

    function divide(left, right) {
      if (left >= right) return;
      const middle = Math.floor((left + right) / 2);
      snapshot(working, [...Array(right - left + 1).keys()].map(k => k + left), [], [], `Divide the range ${left}–${right} at position ${middle}.`);
      divide(left, middle);
      divide(middle + 1, right);
      merge(left, middle, right);
    }

    divide(0, working.length - 1);
    snapshot(working, [], [], [...Array(working.length).keys()], `Finished! The array is sorted: [${working.join(', ')}].`);
  }

  function generateQuickSort(array) {
    const working = [...array];
    const sorted = new Set();
    snapshot(working, [], [], [], 'Choose the last value as the pivot, then partition the array around it.');

    function partition(low, high) {
      const pivot = working[high];
      let i = low - 1;
      snapshot(working, [high], [], [...sorted], `Pivot selected: ${pivot}. Values smaller than it will move left.`);
      for (let j = low; j < high; j++) {
        snapshot(working, [j, high], [j, high], [...sorted], `Compare ${working[j]} with pivot ${pivot}.`);
        if (working[j] <= pivot) {
          i++;
          [working[i], working[j]] = [working[j], working[i]];
          snapshot(working, [i, j], [i, j], [...sorted], `${working[j]} is moved to the smaller-value side.`);
        }
      }
      [working[i + 1], working[high]] = [working[high], working[i + 1]];
      const pivotIndex = i + 1;
      sorted.add(pivotIndex);
      snapshot(working, [pivotIndex], [], [...sorted], `Place pivot ${pivot} at final position ${pivotIndex}.`);
      return pivotIndex;
    }

    function divide(low, high) {
      if (low > high) return;
      if (low === high) {
        sorted.add(low);
        snapshot(working, [low], [], [...sorted], `Position ${low} contains a single value and is sorted.`);
        return;
      }
      const pivotIndex = partition(low, high);
      divide(low, pivotIndex - 1);
      divide(pivotIndex + 1, high);
    }

    divide(0, working.length - 1);
    snapshot(working, [], [], [...Array(working.length).keys()], `Finished! The array is sorted: [${working.join(', ')}].`);
  }

  function buildSteps() {
    const parsed = parseArray();
    if (!parsed) return false;
    initialArray = parsed;
    steps = [];
    stepIndex = 0;
    if (currentAlgorithm === 'bubble') generateBubbleSort(initialArray);
    if (currentAlgorithm === 'insertion') generateInsertionSort(initialArray);
    if (currentAlgorithm === 'selection') generateSelectionSort(initialArray);
    if (currentAlgorithm === 'merge') generateMergeSort(initialArray);
    if (currentAlgorithm === 'quick') generateQuickSort(initialArray);
    stepTotal.textContent = String(Math.max(steps.length - 1, 0));
    renderStep();
    return true;
  }

  function renderStep() {
    if (!steps.length) return;
    const step = steps[stepIndex];
    const maxValue = Math.max(...step.array, 1);
    barsContainer.innerHTML = '';
    step.array.forEach((value, index) => {
      const bar = document.createElement('div');
      bar.className = 'array-bar';
      bar.style.height = `${Math.max(18, (value / maxValue) * 210)}px`;
      bar.textContent = value;
      if (step.sorted.includes(index)) bar.classList.add('sorted');
      else if (step.compared.includes(index)) bar.classList.add('comparing');
      else if (step.active.includes(index)) bar.classList.add('active');
      barsContainer.appendChild(bar);
    });
    stepCount.textContent = String(stepIndex);
    stepDescription.textContent = step.description;
  }

  function stopPlayback() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    playButton.textContent = '▶ Play';
  }

  function startPlayback() {
    if (stepIndex >= steps.length - 1) {
      stepIndex = 0;
      renderStep();
    }
    playButton.textContent = '❚❚ Pause';
    timer = setInterval(() => {
      if (stepIndex < steps.length - 1) {
        stepIndex++;
        renderStep();
      } else {
        stopPlayback();
      }
    }, 1100 - Number(speedRange.value));
  }

  function updateAlgorithm(name) {
    currentAlgorithm = name;
    const data = algorithmData[name];
    tabs.forEach(tab => {
      const active = tab.dataset.algorithm === name;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    visualizerTitle.textContent = data.title;
    codeHeading.textContent = `${data.title} in Java`;
    document.getElementById('average-complexity').textContent = data.average;
    document.getElementById('worst-complexity').textContent = data.worst;
    document.getElementById('space-complexity').textContent = data.space;
    javaCode.textContent = data.code;
    algorithmExample.textContent = data.example;
    stopPlayback();
    buildSteps();
  }

  tabs.forEach(tab => tab.addEventListener('click', () => updateAlgorithm(tab.dataset.algorithm)));

  playButton.addEventListener('click', () => {
    if (!buildSteps()) return;
    if (timer) stopPlayback();
    else startPlayback();
  });

  stepButton.addEventListener('click', () => {
    stopPlayback();
    if (!steps.length && !buildSteps()) return;
    if (stepIndex < steps.length - 1) {
      stepIndex++;
      renderStep();
    }
  });

  resetButton.addEventListener('click', () => {
    stopPlayback();
    buildSteps();
  });

  arrayInput.addEventListener('change', () => {
    stopPlayback();
    buildSteps();
  });

  randomButton.addEventListener('click', () => {
    const count = 7 + Math.floor(Math.random() * 3);
    const values = [];
    while (values.length < count) {
      const value = 5 + Math.floor(Math.random() * 95);
      if (!values.includes(value)) values.push(value);
    }
    arrayInput.value = values.join(', ');
    stopPlayback();
    buildSteps();
  });

  speedRange.addEventListener('input', () => {
    if (timer) {
      stopPlayback();
      startPlayback();
    }
  });

  copyCode.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(javaCode.textContent);
      copyCode.textContent = 'Copied!';
      setTimeout(() => { copyCode.textContent = 'Copy code'; }, 1400);
    } catch (error) {
      copyCode.textContent = 'Select code';
    }
  });

  updateAlgorithm('bubble');
});
