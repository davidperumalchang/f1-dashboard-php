<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreDriverRequest;
use App\Http\Requests\UpdateDriverRequest;
use App\Http\Resources\DriverResource;
use App\Http\Controllers\Controller;
use App\Models\Driver;

class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $drivers = Driver::all();
        return DriverResource::collection($drivers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDriverRequest $request)
    {
        $driver = Driver::create($request->validated());
        return DriverResource::make($driver);
    }

    /**
     * Display the specified resource.
     */
    public function show(Driver $driver)
    {
        return DriverResource::make($driver);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDriverRequest $request, Driver $driver)
    {
        $driver->update($request->validated());
        return DriverResource::make($driver);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Driver $driver)
    {
        $driver->delete();
        return response()->noContent();
    }
}
