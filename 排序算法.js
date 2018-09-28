
/**
 * 冒泡排序
 *  解析：1.比较相邻的两个元素，如果前一个比后一个大，则交换位置。

　　　    2.第一轮的时候最后一个元素应该是最大的一个。

　　　    3.按照步骤一的方法进行相邻两个元素的比较，这个时候由于最后一个元素已经是最大的了，所以最后一个元素不用比较。
 * @param {*} arr  数组
 * @param {*} type  false 升序   true 降序
 */
function sort(arr, type) {
  for (let i = 0, len = arr.length - 1; i < len; i++) {
    for (let n = 0, nlen = arr.length - 1 - i; n < nlen; n++) {
      let check = type ? arr[n] < arr[n + 1] : arr[n] > arr[n + 1]
      check && [arr[n], arr[n + 1]] =[arr[n + 1], arr[n]]
    }
  }
}


/**
 *  快速排序
 *  解析：
 *      快速排序是对冒泡排序的一种改进，第一趟排序时将数据分成两部分，一部分比另一部分的所有数据都要小。然后递归调用，在两边都实行快速排序。
 * @param {*} arr 
 */
function quickSort(arr) {
  if (arr.length <= 1) return arr
  let pivotIndex = Math.floor(arr.length / 2)
  let pivot = arr.splice(pivotIndex, 1)[0]
  let left = []
  let right = []
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}


/**
 *   插入排序
 *解析：

 （1） 从第一个元素开始，该元素可以认为已经被排序

 （2） 取出下一个元素，在已经排序的元素序列中从后向前扫描

 （3） 如果该元素（已排序）大于新元素，将该元素移到下一位置

 （4） 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置

 （5）将新元素插入到下一位置中

 （6） 重复步骤2
 * @param {*} arr
 */
function insertionSort(arr) {
  // 假设弟0个元素是一个有序的数列, 第一个以后的是无序的序列
  // 所以下标从第一个元素开始将无序数列的幻速插入到有序数列中
  for (let i = 1; i < arr.length; i++) {
    // 升序
    if (arr[i] < arr[i - 1]) {
      // 取出无序数列中的第 i 个作为被插入元素
      let guard = arr[i]
      // 记住有序数列中最后一个位置, 并且将有序数列位置扩大一个
      let j = i - 1
      arr[i] = arr[j]
      // 比大小, 找到被插入元素所在的位置
      while (j >= 0 && guard < arr[j]) {
        arr[j + 1] = arr[j]
        j--
      }
      arr[j + 1] = guard  // 插入
    }
  }
}


/**
 *   二分查找   递归方法
 *
 * @param {*} data
 * @param {*} dest
 * @param {*} start
 * @param {*} end
 * @returns
 */
function binarySearch1(data, dest, start, end) {
  let end = end || data.length - 1,
    start = start | 0,
    m = Math.floor((start + end) / 2)

  if (data(m) === dest) {
    return m
  }
  if (dest < data[m]) {
    return binarySearch(data, dest, 0, m - 1)
  } else {
    return binarySearch(data, dest, m + 1, end)
  }
  return false
}


/**
 *  二分查找  非递归方法
 *
 * @param {*} data
 * @param {*} dest
 */
function binarySearch2(data, dest) {
  let len = data.length - 1,
    index = 0
  while (index <= len) {
    let m = Math.floor((len + index) / 2)
    if (data[m] === dest) return m
    if (data[m] > dest) {
      len = m - 1
    } else {
      index = m + 1
    }
  }

  return false

}


/**
 * 选择排序
 * 
 *解析:首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。

　　　　以此类推，直到所有元素均排序完毕。
 * @param {*} arr
 */
function selectionSort(arr) {
  let len = arr.length
  let minIndex, temp
  console.time('选择排序耗时')
  for (let i = 0; i < len - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {  // 寻找最小的数
        minIndex = j      // 将最小数的索引保存
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  console.timeEnd('选择排序耗时')
  return arr
}


/**
 * shell 希尔排序
 * 
 *  解析:先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序
 * @param {*} arr
 */
function shellSort(arr) {
  let len = arr.length,
    temp,
    gap = 1

  console.time('希尔排序耗时')
  while (gap < len / 5) {
    gap = gap * 5 + 1
  }
  for (gap; gap > 0; gap = Math.floor(gap / 5)) {

  }
}