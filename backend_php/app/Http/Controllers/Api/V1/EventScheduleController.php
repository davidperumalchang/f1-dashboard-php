<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreEventScheduleRequest;
use App\Http\Requests\UpdateEventScheduleRequest;
use App\Http\Resources\EventScheduleResource;
use App\Http\Controllers\Controller;
use App\Models\EventSchedule;


class EventScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return EventScheduleResource::collection(EventSchedule::orderBy('event_date', 'desc')->get());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventScheduleRequest $request)
    {
        $eventSchedule = EventSchedule::create($request->validated());
        return EventScheduleResource::make($eventSchedule);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $eventSchedule = EventSchedule::find($id);
        if (!$eventSchedule) {
            return response()->json(['error' => 'Event not found'], 404);
        }
        return new EventScheduleResource($eventSchedule);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventScheduleRequest $request, EventSchedule $eventSchedule)
    {
        $eventSchedule->update($request->validated());
        return EventScheduleResource::make($eventSchedule);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EventSchedule $eventSchedule)
    {
        $eventSchedule->delete();
        return response()->noContent();
    }

}
