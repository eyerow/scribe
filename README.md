# Scribe: A Note-Taking CLI Tool

Scribe is a simple CLI tool built with Deno that allows you to write and store daily notes. It provides a simple way to manage your notes with commands directly from the terminal.

## Features

- Write notes with timestamps.
- Automatically organize notes into files by date.

## Usage

You can compile `scribe` into a standalone binary and use it to create and append notes.

### Compiling to a Standalone Binary

To compile the script into a standalone binary, run the following command:

```
deno task compile
```

This will generate a binary named `scribe` that can be executed on your local machine.

### Write a Note

Once compiled, you can use `scribe` to write a note:

```
./scribe --note "This is my note"
```

### Display Help

For usage information, run the following:

```
./scribe --help
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
