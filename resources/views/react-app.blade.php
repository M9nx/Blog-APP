<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>BlogApp - React Frontend</title>
    @vite(['resources/css/app.css', 'resources/js/react-app.tsx'])
</head>
<body class="bg-gray-50">
    <div id="react-app"></div>
</body>
</html>
