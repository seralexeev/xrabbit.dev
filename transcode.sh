ffmpeg -i 7-1.MOV \                                                                                               at  08:20:10 PM
  -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p \
  -preset veryfast -crf 20 \
  -c:a aac -b:a 192k \
  -movflags +faststart \
  7-1.mp4