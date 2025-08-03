ffmpeg -hide_banner -i "static/media/103-1.MOV" \
 -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p \
 -preset veryfast -crf 20 \
 -c:a aac -b:a 192k \
 -movflags +faststart \
 "static/media/103-1.mp4"