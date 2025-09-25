# Copilot Instructions for agentic-travel-app

## Overview
This project is a full-stack AI-powered travel planning application with a Python backend and a Next.js/React frontend. It uses agent-based architecture for modularity and extensibility.

## Architecture
- **Backend (`backend/`)**: Python FastAPI app with agents for travel tasks (weather, coordinates, itinerary, places, triage). Agents use tools for data retrieval and processing. Key directories:
  - `ai_agents/`: Core agents (e.g., `weather_forecast_agent.py`, `coordinates_agent.py`). Agents are defined using the `Agent` class and can use other agents as tools.
  - `tools/`: Utility functions (e.g., `get_weather.py`, `get_coordinates.py`).
  - `models/`: Model wrappers (e.g., `gemini.py`).
  - `schemas/`: Data schemas for structured responses.
  - `utils/`: Helper functions (e.g., `format_date.py`).
- **Frontend (`frontend/`)**: Next.js app with modular React components. Uses Tailwind CSS for styling. Key directories:
  - `src/components/`: UI components and primitives.
  - `src/app/`: Page routing and layout.
  - `public/assets/`: Static images.

## Developer Workflows
- **Backend**
  - Start server: `uv run uvicorn main:app --reload` (from `backend/`)
  - Dependencies: Managed via `pyproject.toml` and `uv.lock`. Use `uv` for Python package management.
- **Frontend**
  - Install dependencies: `npm i` (from `frontend/`)
  - Start dev server: `npm run dev`

## Agent Patterns
- Agents are defined with clear instructions and always return structured JSON (never markdown).
- Agents can use other agents as tools (e.g., `weather_forecast_agent` uses `get_coordinates` agent to obtain latitude/longitude).
- If required data is missing, agents use `null` and prompt the user for more info.
- Example: `weather_forecast_agent` fetches weather using coordinates, which can be obtained via the `get_coordinates` agent.

## Conventions & Integration
- All agent responses must be JSON and follow the schema in their instructions.
- Tool usage is explicit in agent definitions (see `tools` argument in agent constructors).
- Cross-agent/tool communication is handled via the `as_tool` method.
- Frontend uses modular UI primitives in `src/components/ui/` for consistency.

## External Dependencies
- Backend: FastAPI, Gemini model, uv (Python package manager)
- Frontend: Next.js, React, Tailwind CSS

## Key Files
- `backend/main.py`: FastAPI entry point
- `backend/ai_agents/weather_forecast_agent.py`: Example of agent using another agent as a tool
- `backend/ai_agents/coordinates_agent.py`: Provides latitude/longitude for locations
- `frontend/src/components/ui/`: UI primitives

## Example: Weather Agent Workflow
1. Receives a location query
2. Uses `get_coordinates` agent to get latitude/longitude
3. Uses `get_weather` tool to fetch weather data
4. Returns structured JSON response

---
For questions or unclear conventions, check agent instructions or ask for clarification.
