function bubbleSort(nums) {
  let len = nums.length
  let flag = false
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (nums[j + 1] > nums[j]) {
        ;[nums[j + 1], nums[j]] = [nums[j], nums[j + 1]]
        flag = true
      }
    }
    if (!flag) return nums
  }
  return nums
}
