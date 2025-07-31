ffmpeg -hide_banner -i "static/media/IMG_2294.MOV" \
 -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p \
 -preset veryfast -crf 20 \
 -c:a aac -b:a 192k \
 -movflags +faststart \
 "static/media/11-1.mp4"