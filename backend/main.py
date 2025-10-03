from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from openai.types.responses import ResponseTextDeltaEvent

from agents import enable_verbose_stdout_logging,set_tracing_disabled 

from agents import Runner
from ai_agents.triage_agent import triage_agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # Adjust the origins as needed for your frontend application
    allow_origins=["http://localhost:3000", 'https://agentic-travel-app.vercel.app'],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

@app.get('/')
def root():
    return {"message": 'welcome fast api'}

@app.post('/send-message')
async def send_message(request: Request):
    body = await request.json()
    messages = body.get("messages")

    if not messages:
        def error_stream():
            yield "data: {\"error\": \"No message provided\"}\n\n"
        return StreamingResponse(error_stream(), media_type="text/event-stream")

    async def event_stream():
        enable_verbose_stdout_logging()
        set_tracing_disabled(True) 
        result =  Runner.run_streamed(
            triage_agent,
            input=messages,
        )
        async for event in result.stream_events():
            if event.type == "raw_response_event" and isinstance(event.data, ResponseTextDeltaEvent):
                yield (event.data.delta)

    return StreamingResponse(event_stream(), media_type="text/event-stream")