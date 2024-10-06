# Discord Music Bot

**Features / Tính năng**

	•	Phát nhạc từ YouTube
	•	Điều khiển phát nhạc bằng lệnh: play, skip, stop, queue, autoplay
	•	Hỗ trợ sử dụng lệnh từ cả tin nhắn văn bản (!) và câu lệnh hỗ trợ của Discord (slash commands)
	•	Lệnh help hiển thị danh sách lệnh và thêm hai nút: Discord Server Bot và Facebook Admin

**Setup Instructions / Hướng dẫn cài đặt**

*English*

	1.	Install dependencies:
Run the following command to install all necessary packages:

   ```
   npm install
   ```


  2.	Configure the environment:
	•	Rename the .env.example file to .env and fill in your own information:

   ```
   DISCORD_TOKEN=your_discord_bot_token
   YOUTUBE_API_KEY=your_youtube_api_key
   ```

 •	Update the config.json file with your desired prefix (default: !).

	3.	Run the bot:
Start the bot using:
   ```
   node index.js
   ```

**Tiếng Việt**

	1.	Cài đặt các gói cần thiết:
Chạy lệnh sau để cài đặt tất cả các gói:
   ```
   npm install
   ```

 2.	Cấu hình môi trường:
	•	Đổi tên file .env.example thành .env và điền thông tin của bạn:

   ```
   DISCORD_TOKEN=token_bot_discord_của_bạn
   ```
•	Cập nhật file config.json với prefix mà bạn muốn sử dụng (mặc định là !).

	3.	Chạy bot:
Khởi động bot với lệnh:
   ```
   node index.js
   ```

# How to Use / Cách sử dụng

**English**

	•	!play : Play a song from YouTube.
	•	!skip: Skip the current song.
	•	!stop: Stop the music and disconnect the bot.
	•	!queue: Show the current playlist.
	•	!autoplay: Toggle autoplay for the next song.
	•	/play : Play a song using slash commands.
	•	/skip, /stop, /queue, /autoplay: Use slash commands for other controls.
	•	!help: Display a help message with all available commands and buttons for Discord Server Bot and Facebook Admin.

**Tiếng Việt**

	•	!play <tên bài hát>: Phát một bài hát từ YouTube.
	•	!skip: Bỏ qua bài hát hiện tại.
	•	!stop: Dừng nhạc và thoát bot khỏi kênh.
	•	!queue: Xem danh sách phát hiện tại.
	•	!autoplay: Bật/tắt chế độ tự động phát bài hát tiếp theo.
	•	/play <tên bài hát>: Phát bài hát bằng lệnh hỗ trợ của Discord.
	•	/skip, /stop, /queue, /autoplay: Sử dụng lệnh slash cho các điều khiển khác.
	•	!help: Hiển thị tin nhắn trợ giúp với tất cả các lệnh có sẵn và các nút Discord Server Bot và Facebook Admin.

**Configuration / Cấu hình**

	•	The bot configuration is stored in the config.json file. It includes:
	•	prefix: The symbol used to trigger commands in text chat (default: !).
	•	YouTube API Key: Required to fetch and play music from YouTube.

**Support / Hỗ trợ**

	•	If you need assistance or have any questions, feel free to contact the bot admin via the Facebook Admin button in the help command.
