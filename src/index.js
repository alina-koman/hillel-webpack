import $ from "jquery"
import "./css/style.css"
import "./assets/less/style.less"
import "./assets/sass/style.sass"
import "./assets/sass/style.scss"
import Post from "./post.js"
import Data from "./assets/data.json"
import Logo from "./assets/icon-square-big.png"

const post = new Post('Webpack Post Title', Logo)
$('pre').html(post.toString())
console.log('Post to string:', post.toString())
console.log('Data', Data)