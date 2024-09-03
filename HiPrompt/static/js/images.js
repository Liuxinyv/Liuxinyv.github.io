
Image.prototype.load = function(url){
    var thisImg = this;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url,true);
    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function(e) {
        var blob = new Blob([this.response]);
        thisImg.src = window.URL.createObjectURL(blob);
    };
    xmlHTTP.onprogress = function(e) {
        thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100);
        if (thisImg.loadProgress) thisImg.loadProgress(thisImg.completedPercentage);
    };
    xmlHTTP.onloadstart = function() {
        thisImg.completedPercentage = 0;
    };
    xmlHTTP.send();
};
Image.prototype.completedPercentage = 0;


// Initialize the app
let canvasGroup;
const images = [...Array(5)];

window.addEventListener("DOMContentLoaded", function (event) {
    var app = new Vue({
        el: '#app',
        data: {
            directories: [
                {"path": "./visuals/images/bgr", "name": "bgr", "label": "SDXL", progress: 0},
                {"path": "./visuals/images/img", "name": "input", "label": "HiPrompt", "thumbnail": "", progress: 0},
                {"path": "./visuals/images/ours", "name": "ours", "label": "Our output", progress: 0}
            ],
            loading: false,
            bc: '#88c7b0',
            senszoon: -3.5
        },
        methods: {
            thumb: function(i) {
                if (this.loading) return;
                this.loadImageID(i).then(res => {
                    window.scrollTo(0, 0);
                    for (let dir of this.directories) {
                        canvasGroup.setImage(dir["name"], 'both', images[i][dir['name']], displayImmediately=true, updateMagnification=true);
                    }
                });
            },
            loadImageID: function(id) {
                if (images[id]) return Promise.resolve();
                this.loading = id;
                images[id] = {};
                const imagePromises = [];
                for (let dir of this.directories) {
                    imagePromises.push(new Promise((resolve, reject) => {
                        const img = new Image();
                        img.addEventListener('load', () => {
                            images[id][dir["name"]] = img;
                            dir.progress = 0;
                            resolve();
                        });
                        img.addEventListener('error', (err) => reject(err));
                        img.loadProgress = function(val) {
                            dir.progress = val;
                        };
                        img.load(dir["path"] + "/" + id + ".png");
                    }));
                }
                return Promise.all(imagePromises).then(res => this.loading = false);
            }
        },
        mounted: function () {
            this.images = [...Array(5)].map((_, i) => { // array of arrays
                let image = {};
                return image;
            });
        },
        watch: {
            senszoon: function(val) {
                canvasGroup.zoomRate = 1 + Math.pow(10, val);
            }
        },
        vuetify: new Vuetify()
    });
    // Create a group of canvases that switch mode, drag, and zoom in-sync,uiSize=150
    canvasGroup = new ResponsiveCanvasGroup(uiSize=200);
    for (let dirname of ["input", "bgr", "ours"]) {
        const canvas = document.querySelector('#canvas_' + dirname);
        canvasGroup.registerCanvas(dirname, canvas);
    }
    canvasGroup.zoomDiv = document.getElementById("text_zoom");

});

