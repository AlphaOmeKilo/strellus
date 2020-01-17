export const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      var img = new Image()
      img.onload = function() {
        resolve(img)
      }
      img.onerror = function() {
        reject(img)
      }
      img.src = url
    })
}