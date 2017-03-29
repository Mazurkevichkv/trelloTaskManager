/**
 * Created by zinoviyzubko on 29.03.17.
 */

var gulp = require("gulp");

gulp.task("build", function() {
    return gulp.src("./src/main/webapp/*.html")
        .pipe(gulp.dest("./src/main/resources/public/"));
});