from datetime import datetime
from typing import Any
try:
    from dateutil import parser
except ImportError:
    parser = None

def format_date(date_input: Any) -> str:
    """
    Format any date input to YYYY-MM-DD string.
    Accepts strings, datetime objects, or timestamps.
    Returns 'YYYY-MM-DD' or raises ValueError if parsing fails.
    """
    if isinstance(date_input, datetime):
        return date_input.strftime('%Y-%m-%d')
    if parser is not None:
        try:
            dt = parser.parse(str(date_input))
            return dt.strftime('%Y-%m-%d')
        except Exception as e:
            raise ValueError(f"Could not parse date: {date_input}") from e
    else:
        raise ImportError("dateutil is required for flexible date parsing. Please install it with 'pip install python-dateutil'.")
