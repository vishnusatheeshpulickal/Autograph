exports.welcomeMailTemplate = () => {
  return `<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Welcome to Our App!</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; margin-top:40px;">
	<div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-radius: 5px;">
		<img src="https://res.cloudinary.com/vishnusatheesh/image/upload/v1681426909/Autograph/a-logo_qnna7d.png" alt="Logo" style="display: block; margin: 0 auto; width: 100px; height: auto;">
		<h1 style="margin-top: 40px; margin-bottom: 20px; font-size: 24px; font-weight: bold; color: #2d2d2d; text-align: center;">Welcome to Our App!</h1>
		<p style="margin-bottom: 20px; font-size: 16px; color: #555555; line-height: 1.5; text-align: center;">Thank you for signing up for our app! We're excited to have you on board and can't wait for you to get started.</p>
		<a href="https://autograph-ykmu.onrender.com/" style="display: block; margin: 40px auto 0; padding: 10px 20px; background-color: #5bc0de; color: #ffffff; font-size: 18px; font-weight: bold; text-align: center; text-decoration: none; border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">Get Started</a>
		<div style="margin-top: 40px; font-size: 14px; color: #999999; text-align: center;">
			<p style="color: #999999; text-decoration: none;">If you have any questions or feedback, don't hesitate to <a href="#" style="color:#999999">contact us</a>.</p>
			<p style="color: #999999; text-decoration: none;">You received this email because you signed up for our app. If you wish to unsubscribe, click <a href="#" style="color:#999999">here</a>.</p>
			<p style="color: #999999; text-decoration: none;">&copy; 2023 Autograph. All rights reserved.</p>
		</div>
	</div>
</body>
</html>
    `;
};
