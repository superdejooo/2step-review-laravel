<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Dejan Njezic">
    <title>2step Review</title>




    <!-- App CSS -->
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Open+Sans&display=swap" rel="stylesheet">



    <meta name="theme-color" content="#18314F">

</head>
<body class="text-center bg-primary">

<main class="p-4 bg-white container">
    <div class="row">

        <div class="col-12">
            <h1 class="custom-margin-bottom fw-bold main-title text-uppercase text-center text-secondary">Create Link</h1>

            {{ Form::open(['url' => '/store-link', 'class' => 'text-start']) }}
{{--            <form class="text-start">--}}
                <div class="row">
                    <div class="col-12 col-lg-3 mb-3">
                        <label for="store" class="form-label">Store</label>
                        {{ Form::select('store_id', [null=>'Please Select'] + $stores->toArray(), null, ['class' => 'form-select mb-3']) }}
                    </div>
                    <div class="col-12 col-lg-3 mb-3">
                        <label for="user" class="form-label">User</label>
                        {{ Form::select('user_id', [null=>'Please Select'] + $users->toArray(), null, ['class' => 'form-select mb-3']) }}
                    </div>
                    <div class="col-12 col-lg-3 mb-3">
                        <label class="form-label" for="expiration_date">Expiration Date</label>
                        {{ Form::date('expiration_date', Date::now(), ['class' => 'form-control']) }}
                    </div>
                    <div class="col-12 col-lg-3 mb-3">
                        <label class="form-label" for="slug">Slug</label>
                        {{ Form::text('slug', null, ['class' => 'form-control', 'placeholder' => 'Auto-generated, if empty']) }}
                    </div>

                    <div class="col-12 text-start">
                        @if ($errors->any())
                            <div class="alert alert-danger">
                                <ul class="m-0">
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                    </div>

                    <div class="col-12 mb-3">
                        <button class="w-100 btn btn-lg btn-primary text-uppercase rounded-pill mb-4 main-btn btn-primary" type="submit">Create Link</button>
                    </div>

                </div>

                <p class="mb-3 text-center main-subtitle text-primary">All links</p>

                @if($links->count() == 0)
                <div class="px-4 text-center">
                    <span class="custom-margin-bottom scnd-btn text-primary" href="#">No data ... Please create link</span>
                </div>
                @else
                    <div class="table-responsive">
                        <table class="table align-middle">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Store</th>
                                <th scope="col">User</th>
                                <th scope="col">Expiration date</th>
                                <th scope="col">Usage count</th>
                                <th scope="col">Link</th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($links as $link)
                                <tr>
                                    <th scope="row">{{ $link->id }}</th>
                                    <td>{{ $link->store->name }}</td>
                                    <td>{{ $link->user->full_name }}</td>
                                    <td>{{ $link->expiration_date }}</td>
                                    <td>{{ $link->usage_count }}</td>
                                    <td><a href="{{ url('/review/'.$link->slug) }}" class="btn btn-secondary">Open</a></td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                @endif
            </form>

        </div>

    </div>
</main>


<script src="{{ mix('js/manifest.js') }}"
        rel="preconnect"
        defer
></script>
<script src="{{ mix('js/vendor.js') }}"
        rel="preconnect"
        defer
></script>
<script src="{{ mix('js/app.js') }}"
        rel="preconnect"
        defer
></script>
</body>
</html>
