const variables = [
{variable: "TM_SELECTED_TEXT",  description: "The currently selected text or the empty string"},
{variable: "TM_CURRENT_LINE The",  description: "contents of the current line"},
{variable: "TM_CURRENT_WORD",  description: "The contents of the word under cursor or the empty string"},
{variable: "TM_LINE_INDEX",  description: "The zero-index based line number"},
{variable: "TM_LINE_NUMBER",  description: "The one-index based line number"},
{variable: "TM_FILENAME",  description: "The filename of the current document"},
{variable: "TM_FILENAME_BASE",  description: "The filename of the current document without its extensions"},
{variable: "TM_DIRECTORY",  description: "The directory of the current document"},
{variable: "TM_FILEPATH",  description: "The full file path of the current document"},
{variable: "RELATIVE_FILEPATH", description: "The relative (to the opened workspace or folder) file path of the current document"},
{variable: "CLIPBOARD", description: "The contents of your clipboard"},
{variable: "WORKSPACE_NAME", description: "The name of the opened workspace or folder"},
{variable: "WORKSPACE_FOLDER", description: "The path of the opened workspace or folder"},
{variable: "CURSOR_INDEX", description: "The zero-index based cursor number"},
{variable: "CURSOR_NUMBER", description: "The one-index based cursor number"},
{variable: "CURRENT_YEAR", description: "The current year"},
{variable: "CURRENT_YEAR_SHORT", description: "The current year's last two digits"},
{variable: "CURRENT_MONTH", description: "The month as two digits (example '02')"},
{variable: "CURRENT_MONTH_NAME", description: "The full name of the month (example 'July')"},
{variable: "CURRENT_MONTH_NAME_SHORT", description: "The short name of the month (example 'Jul')"},
{variable: "CURRENT_DATE", description: "The day of the month as two digits (example '08')"},
{variable: "CURRENT_DAY_NAME", description: "The name of day (example 'Monday')"},
{variable: "CURRENT_DAY_NAME_SHORT", description: "The short name of the day (example 'Mon')"},
{variable: "CURRENT_HOUR", description: "The current hour in 24-hour clock format"},
{variable: "CURRENT_MINUTE", description: "The current minute as two digits"},
{variable: "CURRENT_SECOND", description: "The current second as two digits"},
{variable: "CURRENT_SECONDS_UNIX", description: "The number of seconds since the Unix epoch"},
{variable: "CURRENT_TIMEZONE_OFFSET", description: "The current UTC time zone offset as +HH:MM or -HH:MM (example -07:00)."},
{variable: "RANDOM", description: "6 random Base-10 digits"},
{variable: "RANDOM_HEX", description: "6 random Base-16 digits"},
{variable: "UUID", description: "A Version 4 UUID"},
{variable: "BLOCK_COMMENT_START", description: "Example output: in PHP /* or in HTML <!--"},
{variable: "BLOCK_COMMENT_END", description: "Example output: in PHP */ or in HTML -->"},
{variable: "LINE_COMMENT", description: "Example output: in PHP //"},
]

export type DescriptionLookup = {
    [Key: string]: string
}
const descriptionLookup = variables.reduce((acc: DescriptionLookup, cur) => {
    return {...acc, [cur.variable]: cur.description}
}, {})

export {variables, descriptionLookup}